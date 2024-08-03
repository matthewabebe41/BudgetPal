import React from 'react';

class PurchaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // purchaseId: '',
      category: '',
      categoryId: '',
      description: '',
      amount: '',
      selectCategory: []
    };
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => this.setState({ selectCategory: data }));
  }

  handleCategoryInputChange(event) {

    let categoryName = null;

    for (let i = 0; i < this.state.selectCategory.length; i++) {
      if (this.state.selectCategory[i].categoryId === event.target.value) {
        categoryName = this.state.selectCategory[i].categoryName;
      }
      this.setState({ category: categoryName });
    }

    this.setState({ categoryId: event.target.value });
  }

  handleDescriptionInputChange(event) {
    this.setState({ description: event.target.value });
  }

  handleAmountInputChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPurchase = {
    // purchaseId: this.state.purchaseId,
      category: this.state.category,
      categoryId: this.state.categoryId,
      description: this.state.description,
      amount: parseInt(this.state.amount).toFixed(2)
    };
    this.props.onSubmit(newPurchase);
    this.setState({ category: '' });
    this.setState({ description: '' });
    this.setState({ amount: '' });
  }

  render() {
    const categoryValue = this.state.categoryId;
    const purchaseDescriptionValue = this.state.description;
    const amountValue = this.state.amount;
    const optionTemplate = this.state.selectCategory.map((category, key) => (
    <option key={key} value={category.categoryId}>{category.categoryName}</option>
    ));

    return (
    <div className="row">
      <div className="col">
        <div className="purchase-form-container pt-5">
          <form className="purchase-form-group" onSubmit={this.handleSubmit}>
            <h2 className="add-purchase-header">Add a Purchase.</h2>

            <label>Enter Category</label>
            <select className="form-select" aria-label="Default select example" required value={categoryValue} onChange={this.handleCategoryInputChange}>
              <option value="" disabled hidden>Select an option</option>
              {optionTemplate}
            </select>

            <label>Enter Description</label>
            <input
              required
              autoFocus
              type="text"
              value={purchaseDescriptionValue}
              htmlFor="purchaseDescriptionInput"
              className="form-control"
              id="purchaseDescriptionInput"
              placeholder="Description"
              onChange={this.handleDescriptionInputChange} />

            <label>Enter Amount</label>
            <input
              required
              autoFocus
              type="text"
              value={amountValue}
              htmlFor="amountValueInput"
              className="form-control"
              id="amountValueInput"
              placeholder="$0.00"
              onChange={this.handleAmountInputChange} />

            <div className="purchase-form-button-container d-flex justify-content-end w-100">
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default PurchaseForm;
