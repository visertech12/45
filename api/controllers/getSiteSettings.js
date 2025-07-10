const supabase = require('../supabaseClient');

exports.getSiteSettings = async(req, res) => {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error) throw error;

        res.json({
            success: true,
            message: 'request success',
            code: 200,
            data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch site settings',
            code: 500,
            error: err.message,
        });
    }
};