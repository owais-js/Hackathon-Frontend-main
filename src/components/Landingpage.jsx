import React, { useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    TextField,
    Divider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const LandingPage = () => {
    const loanCategories = [
        {
            title: "Wedding Loans",
            maxLoan: 500000,
            period: 3,
            subcategories: ["Venue", "Catering", "Decoration"],
        },
        {
            title: "Home Construction Loans",
            maxLoan: 1000000,
            period: 5,
            subcategories: ["Materials", "Labor", "Furnishing"],
        },
        {
            title: "Business Startup Loans",
            maxLoan: 1000000,
            period: 5,
            subcategories: ["Equipment", "Office Space", "Marketing"],
        },
        {
            title: "Education Loans",
            maxLoan: 800000,
            period: 4,
            subcategories: ["Tuition", "Books", "Accommodation"],
        },
    ];

    // State for loan calculator
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [installment, setInstallment] = useState(null);
    const [error, setError] = useState("");

    // State for Modal
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [cnic, setCnic] = useState("");
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");

    // Calculate Monthly Installment
    const calculateInstallment = () => {
        if (!selectedCategory || !loanAmount || !loanPeriod || !initialDeposit || !selectedSubcategory) {
            setError("Please fill in all the fields.");
            return;
        }

        const selected = loanCategories.find((cat) => cat.title === selectedCategory);

        if (parseFloat(loanAmount) > selected.maxLoan) {
            setError(`Loan amount cannot exceed PKR ${selected.maxLoan.toLocaleString()}`);
            return;
        }

        if (parseInt(loanPeriod) > selected.period) {
            setError(`Loan period cannot exceed ${selected.period} years for ${selectedCategory}.`);
            return;
        }

        if (parseFloat(initialDeposit) >= parseFloat(loanAmount)) {
            setError("Initial deposit cannot be equal to or greater than the loan amount.");
            return;
            }

        setError("");
        const adjustedLoanAmount = parseFloat(loanAmount) - parseFloat(initialDeposit);
        const monthlyInstallment = (adjustedLoanAmount / (parseInt(loanPeriod) * 12)).toFixed(2);
        setInstallment(monthlyInstallment);
    };

    // Handle Proceed Button Click
    const handleProceed = () => {
        setOpen(true); // Open the modal
    };

    // Handle Modal Close
    const handleClose = () => {
        setOpen(false);
        setName("");
        setCnic("");
        setEmail("");
        setFormError("");
    };

    // Handle Submit in Modal
    const handleSubmit = () => {
        if (!name || !cnic || !email) {
            setFormError("All fields are required.");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            setFormError("Name must only contain letters and spaces.");
            return;
        }

        if (!/^\d{13}$/.test(cnic)) {
            setFormError("CNIC must be 13 digits long.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        setFormError("");
        alert("Details submitted successfully!");
        handleClose();
    };

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
            <Container>
                {/* Header */}
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                        Saylani Microfinance App
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Empowering you through interest-free loans
                    </Typography>
                </Box>

                {/* Loan Categories */}
                <Grid container spacing={4}>
                    {loanCategories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    boxShadow: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" color="secondary" gutterBottom>
                                        {category.title}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" mt={2}>
                                        <strong>Maximum Loan:</strong> PKR {category.maxLoan.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" mb={2}>
                                        <strong>Loan Period:</strong> {category.period} years
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Loan Calculator */}
                <Box mt={8} p={4} borderRadius={2} boxShadow={3} bgcolor="white">
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom textAlign="center">
                        Loan Calculator
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3}>
                        {/* Loan Category Selector */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Select Loan Category</InputLabel>
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        const selected = loanCategories.find((cat) => cat.title === e.target.value);
                                        setSelectedCategory(selected.title);
                                        setSelectedSubcategory("");
                                        setLoanPeriod("");
                                        setLoanAmount("");
                                        setInitialDeposit("");
                                        setError("");
                                    }}
                                    label="Select Loan Category"
                                >
                                    {loanCategories.map((category, index) => (
                                        <MenuItem key={index} value={category.title}>
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Subcategory Selector */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Select Subcategory</InputLabel>
                                <Select
                                    value={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    label="Select Subcategory"
                                    disabled={!selectedCategory}
                                >
                                    {selectedCategory &&
                                        loanCategories
                                            .find((cat) => cat.title === selectedCategory)
                                            .subcategories.map((subcat, index) => (
                                                <MenuItem key={index} value={subcat}>
                                                    {subcat}
                                                </MenuItem>
                                            ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Loan Amount Input */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Loan Amount (PKR)"
                                type="number"
                                value={loanAmount}
                                onChange={(e) => {
                                    const amount = e.target.value;
                                    setLoanAmount(amount);
                                    const selected = loanCategories.find((cat) => cat.title === selectedCategory);
                                    if (amount > selected.maxLoan) {
                                        setError(`Loan amount cannot exceed PKR ${selected.maxLoan.toLocaleString()}`);
                                    } else {
                                        setError("");
                                    }
                                }}
                                variant="outlined"
                                disabled={!selectedCategory}
                            />
                        </Grid>

                        {/* Initial Deposit Input */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Initial Deposit (PKR)"
                                type="number"
                                value={initialDeposit}
                                onChange={(e) => setInitialDeposit(e.target.value)}
                                variant="outlined"
                                disabled={!selectedCategory}
                            />
                        </Grid>

                        {/* Loan Period Input */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Loan Period (Years)"
                                type="number"
                                value={loanPeriod}
                                onChange={(e) => {
                                    const period = e.target.value;
                                    setLoanPeriod(period);
                                    const selected = loanCategories.find((cat) => cat.title === selectedCategory);
                                    if (period > selected.period) {
                                        setError(`Loan period cannot exceed ${selected.period} years.`);
                                    } else {
                                        setError("");
                                    }
                                }}
                                variant="outlined"
                                disabled={!selectedCategory}
                            />
                        </Grid>

                        {/* Calculate Button */}
                        <Grid item xs={12} textAlign="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={calculateInstallment}
                                sx={{ px: 4, py: 1.5 }}
                                disabled={!selectedCategory || !selectedSubcategory}
                            >
                                Calculate
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Display Error or Installment */}
                    {error && (
                        <Typography variant="body2" color="error" textAlign="center" mt={3}>
                            {error}
                        </Typography>
                    )}
                    {installment !== null && !error && (
                        <>
                            <Box mt={4} textAlign="center">
                                <Typography variant="h6" color="secondary">
                                    Your Monthly Installment: <strong>PKR {installment}</strong>
                                </Typography>
                            </Box>
                            <Grid item xs={12} textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ px: 4, py: 1.5 }}
                                    onClick={handleProceed}
                                >
                                    Proceed
                                </Button>
                            </Grid>
                        </>
                    )}
                </Box>
            </Container>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Enter Your Details</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="dense"
                        error={!!formError && !/^[a-zA-Z\s]+$/.test(name)}
                        helperText={formError && !/^[a-zA-Z\s]+$/.test(name) && "Name must only contain letters."}
                    />
                    <TextField
                        fullWidth
                        label="CNIC"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        margin="dense"
                        error={!!formError && !/^\d{13}$/.test(cnic)}
                        helperText={formError && !/^\d{13}$/.test(cnic) && "CNIC must be 13 digits."}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="dense"
                        error={!!formError && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                        helperText={
                            formError && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && "Please enter a valid email."
                        }
                    />
                    {formError && (
                        <Typography variant="body2" color="error" mt={2}>
                            {formError}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LandingPage;
