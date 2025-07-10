const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing email or password',
            code: 400
        });
    }

    // Step 1: Lookup user
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password) // ⚠️ Plain text only for dev!
        .single();

    if (error || !user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
            code: 401
        });
    }

    // Step 2: Generate JWT
    const payload = {
        jti: 'api_' + Math.random().toString(36).substring(2, 15),
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
        created_at: user.created_at,
        google2fa: user.google2fa || '',
        invite_code: user.invite_code,
        jwt_scene: 'api'
    };

    const token = jwt.sign(payload, JWT_SECRET);

    // Step 3: Return final response
    return res.json({
        success: true,
        message: 'request success',
        code: 200,
        data: {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            status: user.status,
            created_at: user.created_at,
            google2fa: user.google2fa || '',
            invite_code: user.invite_code,
            token: token,
            authStatus: -2,
            hstatus: -2
        }
    });
};