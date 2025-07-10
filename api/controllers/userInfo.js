const supabase = require('../supabaseClient');

exports.getUserInfo = async(req, res) => {
    const userId = req.user?.id;

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error || !user) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: 'User not found'
        });
    }

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
            base: 0,
            authStatus: -2,
            hstatus: -2
        }
    });
};