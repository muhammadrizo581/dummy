import React, { Component } from "react";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      discount: "",
      data: [],
      editingItem: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, discount, data, editingItem } = this.state;

    if (Number(price) < 0) {
      return alert("Narx ni togri kirgizing!");
    }
    if (Number(discount) > 100) {
      return alert("Chegirma 100% dan kop bolishi mumkin emas");
    }

    const finalDiscount = discount ? Number(discount) : 0;

    let discountedPrice = Number(price) - (Number(price) * finalDiscount) / 100;

    if (Number(price) === 0 || finalDiscount === 100) {
      discountedPrice = 0;
    }

    if (editingItem) {      
      const updatedData = data.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title,
              price: Number(price),
              discount: finalDiscount,
              discountPrice: discountedPrice,
            }
          : item
      );
      this.setState({
        data: updatedData,
        title: "",
        price: "",
        discount: "",
        editingItem: null,
      });
    } else {
      const newItem = {
        id: Date.now(),
        title,
        price: Number(price),
        discount: finalDiscount,
        discountPrice: discountedPrice,
      };
      this.setState({
        data: [...data, newItem],
        title: "",
        price: "",
        discount: "",
      });
    }
  };

  handleDelete = (id) => {
    this.setState({ data: this.state.data.filter((item) => item.id !== id) });
  };

  handleUpdate = (item) => {
    this.setState({
      title: item.title,
      price: item.price,
      discount: item.discount,
      editingItem: item,
    });
  };

  cancelEdit = () => {
    this.setState({ title: "", price: "", discount: "", editingItem: null });
  };

  render() {
    const { title, price, discount, data, editingItem } = this.state;
    return (
      <section className="max-w-[1152px] mx-auto mt-10 grid grid-cols-3 gap-6">
        
        <div className="col-span-1  bg-purple-500  p-6 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {editingItem ? "Update Product" : "Add Product"}
          </h2>
          <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
            <input
              required
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              type="text"
              placeholder="Title"
              className="p-3 rounded-[12px] text-gray-800"
            />
            <input
              required
              value={price}
              onChange={(e) => this.setState({ price: e.target.value })}
              type="number"
              placeholder="Price"
              className="p-3 rounded-[12px] text-gray-800 "
            />
            <input
              value={discount}
              onChange={(e) => this.setState({ discount: e.target.value })}
              type="number"
              placeholder="Discount % (optional)"
              className="p-3 rounded-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex gap-3">
              <button className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-2 rounded-[12px]">
                {editingItem ? "Update" : "Submit"}
              </button>
              {editingItem && (
                <button
                  type="button"
                  onClick={this.cancelEdit}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-[12px]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="col-span-2 bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Product List
          </h2>
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No products yet...</p>
          ) : (
            <div className="grid gap-6 grid-cols-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-white rounded-[12px] "
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  {item.discount > 0 ? (
                    <>
                      {item.discountPrice === 0 ? (
                        <p className="text-green-600 font-bold">FREE</p>
                      ) : (
                        <>
                          <p className="line-through text-gray-500">
                            {item.price}
                          </p>
                          <p className="text-green-600 font-bold">
                            {item.discountPrice}
                          </p>
                        </>
                      )}
                      <span className="inline-block mt-2 font-medium text-white bg-green-500 px-3 py-1 rounded-full">
                        { (item.price === 0 || Number(item.discount) === 100)
                          ? "FREE"
                          : (Number(item.discount) > 0 ? `${Number(item.discount)}% OFF` : "No discount")
                          }

                      </span>
                    </>
                  ) : (
                    <>
                      {item.price === 0 ? (
                        <p className="text-green-600 font-bold">FREE</p>
                      ) : (
                        <p className="text-gray-800 mt-1">{item.price} $</p>
                      )}
                    </>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => this.handleUpdate(item)}
                      className="flex-1 bg-blue-600  text-white py-2 rounded-[12px]"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.handleDelete(item.id)}
                      className="flex-1  bg-red-500 text-white py-2 rounded-[12px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
