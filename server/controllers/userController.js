class UserController {
    async index(req, res) {
        try {
            if (req.user) return res.json({success: true, user: {email: req.user.email, name: req.user.name}});
            return res.status(400).json({success: false, error: 'user.not_found'});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }
}

module.exports = new UserController();