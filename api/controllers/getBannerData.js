const supabase = require('../supabaseClient');

const getBannerData = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('code', 'banner');

    if (error) throw error;

    const banners = data.map(banner => ({
      cover: banner.cover,
      cover_dark: banner.cover_dark,
      name: banner.name,
      object_type: banner.object_type,
      object_id: banner.object_id,
      title: banner.title,
      url: banner.url,
      image: banner.image,
      desc: banner.description, // mapped from `description` field in DB
      content: banner.content
    }));

    return res.json({
      success: true,
      message: 'request success',
      code: 200,
      data: banners
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Failed to fetch banner data',
      error: err.message
    });
  }
};

module.exports = { getBannerData };