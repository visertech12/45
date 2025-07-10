const supabase = require('../supabaseClient');

const getTradeCurrencyList = async (req, res) => {
  try {
    const { data: markets, error: marketsError } = await supabase
      .from('markets')
      .select('*')
      .eq('status', 1)
      .order('sort', { ascending: false });

    if (marketsError) throw marketsError;

    const response = [];

    for (const market of markets) {
      const { data: legal, error: legalError } = await supabase
        .from('legals')
        .select('id, symbol, icon, decimals, trade_decimals')
        .eq('id', market.legal_id)
        .single();

      if (legalError) throw legalError;

      const { data: currencies, error: currencyError } = await supabase
        .from('currencies')
        .select('*')
        .eq('market_id', market.id);

      if (currencyError) throw currencyError;

      response.push({
        id: market.id,
        title: {
          'zh-Hant': market.title_zh || market.title_en,
          en: market.title_en,
        },
        legal_id: market.legal_id,
        is_trade: market.is_trade,
        is_contract: market.is_contract,
        is_futures: market.is_futures,
        sort: market.sort,
        status: market.status,
        risk_control: market.risk_control,
        position_mode: market.position_mode,
        currency_type: market.currency_type,
        created_at: market.created_at,
        updated_at: market.updated_at,
        legal,
        currency: currencies,
      });
    }

    return res.json({
      success: true,
      message: 'request success',
      code: 200,
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Failed to fetch trade currency list',
      error: err.message,
    });
  }
};

module.exports = { getTradeCurrencyList };
