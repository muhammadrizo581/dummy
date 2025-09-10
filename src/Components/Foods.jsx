import React, { Component } from "react";

export default class Food extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      price: "",
      foods: [],
      editingFood: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, price, foods, editingFood } = this.state;

    if (!name || !category || price === "") {
      return alert("Malumotlarni toldiring");
    }
    if (Number(price) < 0) {
      return alert("Min narx 0");
    }

    if (editingFood) {
      
      const updatedFoods = foods.map((food) =>
        food.id === editingFood.id
          ? { ...food, name, category, price: Number(price) }
          : food
      );
      this.setState({
        foods: updatedFoods,
        name: "",
        category: "",
        price: "",
        editingFood: null,
      });
    } else {
      
      const newFood = {
        id: Date.now(),
        name,
        category,
        price: Number(price),
      };
      this.setState({
        foods: [...foods, newFood],
        name: "",
        category: "",
        price: "",
      });
    }
  };

  handleDelete = (id) => {
    this.setState({ foods: this.state.foods.filter((food) => food.id !== id) });
  };

  handleUpdate = (food) => {
    this.setState({
      name: food.name,
      category: food.category,
      price: food.price,
      editingFood: food,
    });
  };

  cancelEdit = () => {
    this.setState({ name: "", category: "", price: "", editingFood: null });
  };

  render() {
    const { name, category, price, foods, editingFood } = this.state;
    return (
      <section className="max-w-[1152px] mx-auto mt-10 grid grid-cols-3 gap-6">
        
        <div className="col-span-1 bg-purple-500 p-6 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {editingFood ? "Update Food" : "Add Food"}
          </h2>
          <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
            <input
              required
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Food Name"
              className="p-3 rounded-[12px] text-gray-800"
            />
            <input
              required
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}
              type="text"
              placeholder="Category"
              className="p-3 rounded-[12px] text-gray-800"
            />
            <input
              required
              value={price}
              onChange={(e) => this.setState({ price: e.target.value })}
              type="number"
              placeholder="Price"
              className="p-3 rounded-[12px] text-gray-800"
            />

            <div className="flex gap-3">
              <button className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-2 rounded-[12px]">
                {editingFood ? "Update" : "Submit"}
              </button>
              {editingFood && (
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
            Food List
          </h2>
          {foods.length === 0 ? (
            <p className="text-center text-gray-500">No foods yet...</p>
          ) : (
            <div className="grid gap-6 grid-cols-2">
              {foods.map((food) => (
                <div key={food.id} className="p-5 bg-white rounded-[12px]">
                  <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
                  <p className="text-gray-600">Category: {food.category}</p>
                  <p className="text-gray-800 mt-1">{food.price} $</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => this.handleUpdate(food)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-[12px]"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.handleDelete(food.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-[12px]"
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
