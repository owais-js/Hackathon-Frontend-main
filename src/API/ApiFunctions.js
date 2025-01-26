const signupRoute = "http://hackathon-backend-main.vercel.app/auth/signup";
const loginRoute = "http://hackathon-backend-main.vercel.app/auth/login";
const registerroute = "http://hackathon-backend-main.vercel.app/auth/register";
/**
 * Sign in with email and password
 * @param {string} email - The email address of the user.  
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the API call fails or returns an error.
 */
const signInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await fetch(loginRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to log in. Please try again.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        throw error;
    }
};

const RegisterWithDetails = async (name, cnic, email) => {
    try {
        const response = await fetch(registerroute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, cnic, email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register. Please try again.");
        }

        alert("Registration successful!");

        return await response.json();
        Navigate('/loginform');
    } catch (error) {
        console.error("Error during register:", error.message);

        throw error;
    }
};


/**
 * Register a new user with email and password
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the API call fails or returns an error.
 */
const RegisterWithEmailAndPassword = async (email, password) => {
    try {
        const response = await fetch(signupRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register. Please try again.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

export { signInWithEmailAndPassword, RegisterWithEmailAndPassword, RegisterWithDetails };
