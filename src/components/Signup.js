import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { firebaseauth } from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
export default function Signup(){
    const emailref = useRef()
    const passref = useRef()
    const passref2 = useRef()
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState()
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        if(passref.current.value !== passref2.current.value){
            return setError("Passwords dont match");
        }
        try{
            setLoading(true)
            setError("")
            createUserWithEmailAndPassword(auth, emailref.current.value, passref.current.value).then((userCredential) => {
                
                setCurrentUser(userCredential.user);
                console.log(userCredential);
              });
            navigate("/", {state: {currentUser}});
        }catch{
            setError('something is wrong, try again')
        }
        setLoading(false)
        
    }
    return (
        <>
        
        <Container className="d-flex align-items-center justify-content-center"
        style = {{minHeight:"100vh"}}>
        
        <div className="w-100" style={{maxWidth:"400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailref} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passref} required />
                        </Form.Group>
                        <Form.Group id="confirmpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passref2} required />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className="w-100" type="submit" >
                            Sign Up
                        </Button>
                        
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">Already have an account? <Link to="/login">Log In</Link></div>
        </div>
        
        </Container>
        

        </>
        
    )
 }
