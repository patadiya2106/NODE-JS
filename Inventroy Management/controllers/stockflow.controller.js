// Temporary in-memory data store
let stocks = [
  { id: 1, name: "Monitor", quantity: 25 },
  { id: 2, name: "Keyboard", quantity: 40 }
];

// Get all stocks
exports.getAllStocks = (req, res) => {
  res.json(stocks);
};

// Add new stock
exports.addStocks = (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({ message: "Name and quantity are required." });
  }

  const newStock = {
    id: stocks.length ? stocks[stocks.length - 1].id + 1 : 1,
    name,
    quantity
  };

  stocks.push(newStock);
  res.status(201).json(newStock);
};

// Update stock by ID
exports.updateStock = (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const stock = stocks.find(s => s.id === parseInt(id));

  if (!stock) {
    return res.status(404).json({ message: "Stock not found." });
  }

  if (name !== undefined) stock.name = name;
  if (quantity !== undefined) stock.quantity = quantity;

  res.json(stock);
};

// Delete stock by ID
exports.deleteStock = (req, res) => {
  const { id } = req.params;
  const index = stocks.findIndex(s => s.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Stock not found." });
  }

  const deleted = stocks.splice(index, 1);
  res.json({ message: `Deleted stock with ID ${id}`, stock: deleted[0] });
};
