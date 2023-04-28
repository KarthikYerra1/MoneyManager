import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionType: transactionTypeOptions[0].optionId,
  }

  onDeleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      each => each.id !== id,
    )
    this.setState({
      transactionList: updatedTransactionList,
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionType} = this.state

    const typeOption = transactionTypeOptions.find(
      eachOption => eachOption.optionId === optionType,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionType: transactionTypeOptions[0].optionId,
    }))
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expenseAmount = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expenseAmount += each.amount
      }
    })
    return expenseAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expenseAmount += each.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionType, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()
    return (
      <div className="bg-container">
        <div className="responsive-container">
          {/* Profile Container */}
          <div className="profile-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="profile-description">
              Welcome back to your
              <span className="money-manager-name"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
            balanceAmount={balanceAmount}
          />
          {/* Form and History container */}
          <div className="form-history-container">
            {/* Add transaction Container */}
            <div className="transactions-container add-transaction-container">
              <h1 className="add-transaction-heading">Add Transaction</h1>
              {/* Form container */}
              <form className="form-container" onSubmit={this.onAddTransaction}>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="input-box"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  placeholder="TITLE"
                  id="title"
                  type="text"
                />
                <label className="label" htmlFor="amount">
                  AMOUNT
                </label>
                <input
                  className="input-box"
                  value={amountInput}
                  onChange={this.onChangeAmount}
                  placeholder="AMOUNT"
                  id="amount"
                  type="text"
                />
                <label className="label" htmlFor="type">
                  TYPE
                </label>
                <select
                  id="type"
                  className="input-box"
                  value={optionType}
                  onChange={this.onChangeOption}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
              {/* End of Form */}
            </div>
            {/* End of Add Transaction Container */}
            {/* Start of History Container */}
            <div className="transactions-container history-container">
              <h1 className="history-heading">History</h1>
              <div className="transactions-table-container">
                <ul className="column-heading-list">
                  <li className="heading-list-points">
                    <p className="cell">Title</p>
                    <p className="cell">Amount</p>
                    <p className="cell">Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      onDeleteTransaction={this.onDeleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
