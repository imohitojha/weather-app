// Authentication Object
const authentication = {

    // Login status
    isLoggedIn: false,

    // Tells if the user is present based on the presence of the token
    isLoggedInfun()
    {
        if(localStorage.getItem('token')!==null)
        {  
            return (this.isLoggedIn=true)
        }
        else
        {
            return  (this.isLoggedIn=false)
        }
    },

    // Function for Logging in the user
    async Login() {
        await fetch('http://localhost:9000/auth/isAuthenticated', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                // Sets the isLoggedIn in based on the authorization successful or not
                this.isLoggedIn = data.isAuthenticated;
            });
    }
}

export default authentication;