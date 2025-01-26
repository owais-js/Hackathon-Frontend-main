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
    Paper,
} from "@mui/material";
import { RegisterWithDetails, RegisterWithEmailAndPassword } from "../API/ApiFunctions";

const Home = () => {
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

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [installment, setInstallment] = useState(null);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [cnic, setCnic] = useState("");
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");

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

    const handleProceed = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setCnic("");
        setEmail("");
        setFormError("");
    };

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
        setSelectedCategory("");
        setSelectedSubcategory("");
        setLoanAmount("");
        setInitialDeposit("");
        setLoanAmount("");
        handleClose();
    };

    return (
        <Box sx={{ bgcolor: "#f0f4f8", minHeight: "100vh", py: 6, fontFamily: "'Poppins', sans-serif" }}>
            <Container>
                <Paper elevation={4} sx={{ p: 4, mb: 6, background: "linear-gradient(135deg, #6e7dff, #f0f0f0)" }}>
                    <Typography variant="h3" textAlign="center" fontWeight="bold" color="primary" gutterBottom>
                        Saylani Microfinance App
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center" color="textSecondary">
                        Empowering you through interest-free loans
                    </Typography>
                </Paper>

                <Grid container spacing={4} mb={6}>
                    {loanCategories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    p: 2,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" color="#00bfae" gutterBottom>
                                        {category.title}
                                    </Typography>
                                    <Typography>
                                        <strong>Max Loan:</strong> PKR {category.maxLoan.toLocaleString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Loan Period:</strong> {category.period} years
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
                    <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary" gutterBottom>
                        Loan Calculator
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Select Loan Category</InputLabel>
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    label="Select Loan Category"
                                    sx={{
                                        borderColor: "#00bfae",
                                        backgroundColor: "#f0f4f8",
                                    }}
                                >
                                    {loanCategories.map((cat, index) => (
                                        <MenuItem value={cat.title} key={index}>
                                            {cat.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Select Subcategory</InputLabel>
                                <Select
                                    value={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    label="Select Subcategory"
                                    disabled={!selectedCategory}
                                    sx={{
                                        borderColor: "#00bfae",
                                        backgroundColor: "#f0f4f8",
                                    }}
                                >
                                    {selectedCategory &&
                                        loanCategories
                                            .find((cat) => cat.title === selectedCategory)
                                            .subcategories.map((sub, index) => (
                                                <MenuItem value={sub} key={index}>
                                                    {sub}
                                                </MenuItem>
                                            ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Loan Amount"
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                disabled={!selectedCategory}
                                sx={{
                                    backgroundColor: "#f0f4f8",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Initial Deposit"
                                type="number"
                                value={initialDeposit}
                                onChange={(e) => setInitialDeposit(e.target.value)}
                                disabled={!selectedCategory}
                                sx={{
                                    backgroundColor: "#f0f4f8",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Loan Period (Years)"
                                type="number"
                                value={loanPeriod}
                                onChange={(e) => setLoanPeriod(e.target.value)}
                                disabled={!selectedCategory}
                                sx={{
                                    backgroundColor: "#f0f4f8",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={calculateInstallment}
                                disabled={!selectedCategory || !selectedSubcategory}
                                sx={{
                                    backgroundColor: "#ff5722",
                                    ":hover": {
                                        backgroundColor: "#ff3d00",
                                    },
                                }}
                            >
                                Calculate
                            </Button>
                        </Grid>
                    </Grid>

                    {error && (
                        <Typography color="error" textAlign="center" mt={2}>
                            {error}
                        </Typography>
                    )}

                    {installment && !error && (
                        <Box textAlign="center" mt={4}>
                            <Typography variant="h6" color="secondary">
                                Your Monthly Installment: <strong>PKR {installment}</strong>
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleProceed}
                                sx={{ mt: 2 }}
                            >
                                Proceed
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Your Details</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="dense"
                        error={formError && !/^[a-zA-Z\s]+$/.test(name)}
                        helperText={formError && !/^[a-zA-Z\s]+$/.test(name) ? "Invalid Name" : ""}
                    />
                    <TextField
                        fullWidth
                        label="CNIC"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        margin="dense"
                        error={formError && !/^\d{13}$/.test(cnic)}
                        helperText={formError && !/^\d{13}$/.test(cnic) ? "Invalid CNIC" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="dense"
                        error={formError && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                        helperText={formError && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Invalid Email" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleSubmit();
                        RegisterWithDetails(name, cnic, email)
                    }
                    } color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Home;
