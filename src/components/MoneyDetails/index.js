import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expenseAmount, balanceAmount} = props

  return (
    <div className="details-container">
      <div className="card-container bal">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image"
        />
        <div className="money-details">
          <p className="type-option">Your Balance</p>
          <p data-testid="balanceAmount" className="amount-text">
            Rs. {balanceAmount}
          </p>
        </div>
      </div>
      <div className="card-container inc">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image"
        />
        <div className="money-details">
          <p className="type-option">Your Income</p>
          <p data-testid="incomeAmount" className="amount-text">
            Rs. {incomeAmount}
          </p>
        </div>
      </div>
      <div className="card-container exp">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image"
        />
        <div className="money-details">
          <p className="type-option">Your Expenses</p>
          <p data-testid="expensesAmount" className="amount-text">
            Rs. {expenseAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
