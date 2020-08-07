
import React from 'react';
import { Sidebar } from './Sidebar';
import { Content } from './Lorem-Ipsum';

const Dashboard = () => {
	return (
		<div>
			<Sidebar />
			<main>
				<h1>
					This is the title
				</h1>
				<p><Content /></p>
				<p><Content /></p>
				<p><Content /></p>
				<p><Content /></p>
				<p><Content /></p>
				<p><Content /></p>
			</main>
		</div>
	)
}

export default Dashboard;