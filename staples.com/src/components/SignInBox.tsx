import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
    SignIn,
    useAuthentication
} from "@asgardeo/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface SignInBoxProps {
    idfAuthCount: number;
    isAuthenticatorsAvailable: boolean;
    setDrawerOpen: (open: boolean) => void;
    setForgotPasswordOpen: (open: boolean) => void;
    setIdfAuthCount: (count: number) => void;
    setIsAuthenticatorsAvailable: (available: boolean) => void;
    toggleSignupOverlay: () => void;
}

const SignInBox = (props: SignInBoxProps) => {

    const {
        idfAuthCount,
        isAuthenticatorsAvailable,
        setDrawerOpen,
        setForgotPasswordOpen,
        setIdfAuthCount,
        setIsAuthenticatorsAvailable,
        toggleSignupOverlay
    } = props;

    const { authResponse, isGlobalLoading, setUsername } = useAuthentication();    

    const [showNonUniqueUsernameError, setShowNonUniqueUsernameError] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (idfAuthCount === 2) {
            // Change the label of the username field to "Mobile Number"
            const label = document.querySelector('.MuiFormLabel-root');
            const input = document.querySelector('.MuiInputBase-input') as HTMLInputElement;
            
            if (input) {
              input.placeholder = 'Enter your mobile number';
            }
            
            if (label) {
              label.textContent = 'Mobile Number';
            }

            setUsername("")
            setShowNonUniqueUsernameError(true);
        } else {
            setShowNonUniqueUsernameError(false);
        }
    }, [idfAuthCount]);

    useEffect(() => {
        if (authResponse?.flowStatus === "SUCCESS_COMPLETED") {
            setIdfAuthCount(-1);
            setShowNonUniqueUsernameError(false);
            setUsername("");
            setIsAuthenticatorsAvailable(true);
            setIsLoggedIn(true);

            return;
        }
        
        checkForNonUniqueUsername(authResponse);

        if (authResponse) {
            idfAuthCount !== -1 && idfAuthCount !== 0 && setIsAuthenticatorsAvailable(authResponse?.nextStep?.authenticators?.length > 0);
        }
    }, [authResponse]);

    const checkForNonUniqueUsername = (authResponse: any) => {
        if (authResponse === undefined) {
            // Increase the IDF Auth Count by 1
            // To compensate for page reload
            setIdfAuthCount(idfAuthCount + 1);

            return;
        }
        
        // Check if the authentication flow is incomplete
        // Only allow the user to proceed if the flow is incomplete
        if (authResponse?.flowStatus !== "INCOMPLETE") return;

        // Check if the authenticator array contains an authenticator
        // of type "Identifier First"
        const identifierFirstAuthenticator = authResponse?.nextStep?.authenticators?.find(
            (authenticator: any) => authenticator.authenticator === 'Identifier First');

        if (identifierFirstAuthenticator) {
            setIdfAuthCount(idfAuthCount + 1);
        } else {
            setShowNonUniqueUsernameError(false);
        }
    };

    const handleSignUpClick = () => {
        toggleSignupOverlay();
    };

    const handleSignInReset = () => {
        setDrawerOpen(false);
        setShowNonUniqueUsernameError(false);
        setUsername("");
        setIsAuthenticatorsAvailable(true);
    };

    return (
        <>
            {!isLoggedIn && !isGlobalLoading && !isAuthenticatorsAvailable && (
                <div className="sign-in-box-bottom-content">
                    <Alert severity="error" sx={{ padding: "20px", margin: "50px 10px" }}>
                        <AlertTitle>Error has occured!</AlertTitle>
                        Something went wrong... Please try signing again.
                    </Alert>
                    <Button
                        variant='outlined'
                        className='create-account-button'
                        onClick={() => { handleSignInReset(); }}
                    >
                        Close
                    </Button>
                </div>
            )}
            <div className="sign-in-box-container">
                <SignIn
                    showLogo={false}
                    showSignUp={false}
                    showFooter={false}
                    identifierFirstChildren={
                        <div className="sign-in-children-container">
                            { showNonUniqueUsernameError && (
                            <Alert severity="warning">
                                Email or username used as login identifier leads to an ambiguity. 
                                Please provide your mobile number as a login identifier.
                            </Alert>
                            )}
                            <Button 
                            onClick={ () => setForgotPasswordOpen(true) }
                            sx={{
                                textTransform: 'none',
                                color: '#000'
                            }}
                            >
                                <Typography variant="body2">
                                    Forgot <a href="#" style={{ color: "black" }}>Password</a>?
                                </Typography>
                            </Button>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={
                                    <Typography variant="body2">Keep me signed in <a href="#" style={{ color: "black" }}>Learn More</a></Typography>
                                }
                            />
                        </div>
                    }
                    brandingProps={{
                        locale: 'en-US',
                        preference: {
                          text: {
                            'en-US': {
                              login: {
                                'enter.your.username': 'Enter your Email or Username',
                                'username': 'Email or Username'
                              }
                            }
                          }
                        }
                    }}
                />
                {
                    !isLoggedIn && !isGlobalLoading && isAuthenticatorsAvailable && (
                        <div className='sign-in-box-bottom-content'>
                            <Typography variant="body2" sx={{ marginTop: "10px" }}>
                                By signing in, you agree to Staples Easy Rewards
                            </Typography>
                            <Typography variant="body2">
                                <a href="#" style={{ color: "black" }}>Terms and Conditions</a>
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: "20px" }}>
                                Federal Government Customers <a href="#" style={{ color: "black" }}>click here</a>
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginTop: "20px", marginBottom: "10px", fontWeight: 600, color: "rgb(77, 77, 79)" }}>
                                Don't have an account?
                            </Typography>
                            <Button
                                variant='outlined'
                                className='create-account-button'
                                onClick={() => { handleSignUpClick(); }}
                            >
                                Create account
                            </Button>
                            <div className='privacy-notice-container'>
                                <Typography variant="caption" sx={{ color: "rgb(77, 77, 79)" }}>
                                    <a href="#" style={{ color: "black" }}>Privacy Notice</a>
                                </Typography>
                                <Typography variant="caption" sx={{ color: "rgb(77, 77, 79)" }}>
                                    <a href="#" style={{ color: "black" }}>California Notice</a>
                                </Typography>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default SignInBox;