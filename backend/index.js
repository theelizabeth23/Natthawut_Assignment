
const express = require('express'),
app = express(),
passport = require('passport'),
port = process.env.PORT || 80,
cors = require('cors'),
cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let shops = {
    list: [
        { id: 1, name: "Avenger infinity war", score:8, imageurl:"https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMTcvODYyNDkvYXZlbmdlcnNpbmZpbml0eXdhci5qcGc=.jpg"},
        { id: 2, name: "Avenger endgame", score:9, imageurl:"https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMTcvODYyNDkvNTM3MzYzNzlfMTAxNTYyNzk0NjQ1MDYwOTRfNjIuanBn.jpg"},
        { id: 3, name: " Avatar", score:9, imageurl:"https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvNC8yMDIwMy9hdmEtc3MuanBn.jpg" },
        { id: 4, name: "Resident Evil", score:5, imageurl:"https://cdn.majorcineplex.com/uploads/movie/3205/thumb_3205.jpg?160220221003"},

    ]
    
}
let income = 0

router.post('/login', (req, res, next) => {
passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('Login: ', req.body, user, err, info)
    if (err) return next(err)
    if (user) {
        const token = jwt.sign(user, db.SECRET, {
            expiresIn: '1d'
        })
        // req.cookie.token = token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ user, token })
    } else
        return res.status(422).json(info)
})(req, res, next)
})

router.get('/logout', (req, res) => {
res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
    })
);
res.statusCode = 200
return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send(req.user)
});

router.get('/comment',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send('comment')
});

router.route('/shops')
.get((req, res) => res.json(shops.list))
.post((req, res) => {
    console.log(req.body)
    let newshop = {}
    newshop.id = (shops.list.length) ? shops.list[shops.list.length - 1].id + 1 : 1
    newshop.name = req.body.name
    newshop.score = req.body.score
    newshop.imageurl = req.body.imageurl
    shops = { "list": [...shops.list, newshop] }
    res.json(shops.list)
})

router.route('/shops/:shop_id')
.get((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    res.json(shops.list[id])
})
.put((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    shops.list[id].id = req.body.id
    shops.list[id].name = req.body.name
    shops.list[id].score = req.body.score
    shops.list[id].imageurl = req.body.imageurl
    res.json(shops.list)
})
.delete((req, res) => {
    const shop_id = req.params.shop_id
    shops.list = shops.list.filter(item => +item.id !== +shop_id)
    res.json(shops.list)
})



router.route('/income')
.get((req, res) => res.json(income))



router.route('/purchase/:shop_id')
.delete((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    console.log('shopID: ', shop_id, 'ID: ', id)
    if (id !== -1) {
        income += shops.list[id].score
        shops.list = shops.list.filter(item => +item.id !== +shop_id)
        res.json(shops.list)
    }
    else {
        res.send('Not found')

    }
})

router.post('/register',
async (req, res) => {
    try {
        const SALT_ROUND = 10
        const { username, email, password } = req.body
        if (!username || !email || !password)
            return res.json({ message: "Cannot register with empty string" })
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" })

        let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
        hash = await bcrypt.hash(password, SALT_ROUND)
        users.users.push({ id, username, password: hash, email })
        res.status(200).json({ message: "Register success" })
    } catch {
        res.status(422).json({ message: "Cannot register" })
    }
})

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
let statusCode = err.status || 500
res.status(statusCode);
res.json({
    error: {
        status: statusCode,
        message: err.message,
    }
});
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

