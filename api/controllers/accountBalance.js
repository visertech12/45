const supabase = require('../supabaseClient');

const getAccountBalance = async (req, res) => {
  try {
    // 1. Fetch all balances (assuming there's a `balances` table for the user)
    const { data: balances, error: balanceError } = await supabase
      .from('balances')
      .select(`
        currency_id,
        balance,
        trade_balance,
        contract_balance,
        future_balance,
        finance_balance,
        strategy_balance,
        lock_balance,
        lock_trade,
        lock_contract,
        lock_future,
        lock_finance,
        lock_strategy,
        currencies (
          symbol,
          icon,
          chain_text,
          new_price
        )
      `);

    if (balanceError) throw balanceError;

    // 2. Format and map balances
    const formattedBalances = balances.map(b => ({
      currency_id: b.currency_id,
      balance: b.balance,
      trade_balance: b.trade_balance,
      contract_balance: b.contract_balance,
      future_balance: b.future_balance,
      finance_balance: b.finance_balance,
      strategy_balance: b.strategy_balance,
      lock_balance: b.lock_balance,
      lock_trade: b.lock_trade,
      lock_contract: b.lock_contract,
      lock_future: b.lock_future,
      lock_finance: b.lock_finance,
      lock_strategy: b.lock_strategy,
      symbol: b.currencies.symbol,
      icon: b.currencies.icon,
      chain_text: b.currencies.chain_text,
      finance_dep: 0,
      finance_pro: 0,
      new_price: b.currencies.new_price
    }));

    // 3. Calculate total
    const total = {
      balance: "0.00000000",
      trade_balance: "0.00000000",
      contract_balance: "0.00000000",
      future_balance: "0.00000000",
      finance_balance: "0.00000000",
      strategy_balance: "0.00000000",
      new_price: "111250.00000000" // replace this with logic if needed
    };

    return res.json({
      success: true,
      message: 'request success',
      code: 200,
      data: {
        dayProfit: false,
        total,
        balance: formattedBalances
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Failed to fetch account balance',
      error: err.message
    });
  }
};

module.exports = { getAccountBalance };
