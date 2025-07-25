const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user._id; // Get user ID from the request
    try {
        const{ icon, source,  amount, date} = req.body;

        // Vaidation Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date :new Date(date), // Ensure date is stored as a Date object
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later"});
    }
}

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id; // Get user ID from the request
    try {
        const income = await Income.find({ userId }).sort({ date: -1 }); // Sort by date descending
        res.json(income);
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income source deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

// Download Income Sources as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id; // Get user ID from the request
    try{
        const income = await Income.find({ userId }).sort({ date: -1 }); // Sort by date descending
        
        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws =xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download('income_details.xlsx');
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};
