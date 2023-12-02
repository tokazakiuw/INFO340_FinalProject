import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Chat } from './Chat/Chat';
import Inventory from './Inventory/Inventory';
import Main from './Feed/Main';
import Rules from './Rules';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Onboard/Login';
import Signup from './Onboard/Signup';
import Feed from './Feed/Feed';
import { CardDetail } from './Feed/CardDetail';

function App(props) {
	const [routes, setRoutes] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				setRoutes(
					<Routes>
						<Route path="/chat" element={<Chat />}></Route>
						<Route path="/main" element={<Main />}>
							<Route path=':id' element={<CardDetail />}/>
							<Route index element={<Feed />} />
						</Route>
						<Route path="/inventory" element={<Inventory />} />
						<Route path="/rules" element={<Rules />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<Navigate to="/main" />} />
					</Routes>
				);
			} else {
				setRoutes(
					<Routes>
						<Route path="/login" element={<Login auth={auth} />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/rules" element={<Rules />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				);
			}
		});

		return () => unsubscribe();
	}, [auth, props.data]);

	return (
		<>
			<Navbar auth={auth} />
			{routes}
			<Footer />
		</>
	);
}

export default App;