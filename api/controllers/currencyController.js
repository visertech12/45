const supabase = require('../supabaseClient');

const getCurrencyInfo = async (req, res) => {
  let { id, cid } = req.body;

  // Demo fallback if missing
  if (!id || !cid) {
    id = 1;
    cid = 1;
    console.log("Demo mode: Using fallback values id=1, cid=1");
  }

  const { data, error } = await supabase
    .from('currencies')
    .select('*')
    .eq('id', id)           // ✅ matches your DB column
    .eq('market_id', cid)   // ✅ matches your DB column
    .single();

  if (error || !data) {
    console.error("Supabase error:", error);
    return res.status(404).json({
      success: false,
      code: 404,
      message: "Currency not found"
    });
  }

  let currencyInfo = {};
  try {
    currencyInfo = typeof data.currency_info === 'string'
      ? JSON.parse(data.currency_info)
      : data.currency_info;
  } catch (_) {
    currencyInfo = {};
  }

  return res.status(200).json({
    success: true,
    message: "Request success",
    code: 200,
    data: {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      chain_text: data.chain_text,
      chain: data.chain,
      contract_token: data.contract_token,
      chain_ids: data.chain_ids,
      icon: data.icon,
      sort: data.sort,
      display: data.display,
      with_min: data.with_min,
      with_max: data.with_max,
      with_charge: data.with_charge,
      recharge_min: data.recharge_min,
      is_trade: data.is_trade,
      is_contract: data.is_contract,
      is_futures: data.is_futures,
      is_legal: data.is_legal,
      decimals: data.decimals,
      trade_decimals: data.trade_decimals,
      currency_info: currencyInfo,
      status: data.status,
      is_recharge: data.is_recharge,
      created_at: data.created_at,
      updated_at: data.updated_at,
      d_c: data.d_c,
      d_token: data.d_token,
      remark: data.remark,
      stock_type: data.stock_type,
      currency_id: data.currency_id,
      cm_id: data.cm_id,
      new_price: data.new_price,
      old_price: data.old_price,
      high_price: data.high_price,
      low_price: data.low_price,
      quantity: data.quantity,
      quota: data.quota,
      change: data.change,
      change_rate: data.change_rate,
      ave_price: data.ave_price,
      transaction: data.transaction
    }
  });
};

module.exports = { getCurrencyInfo };
