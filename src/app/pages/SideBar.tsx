import React from "react";
import {FaPlus, FaList} from 'react-icons/fa';

interface SideBarProps{
	onNavigate: (page: string) => void;
	activePage: string;
}

export function SideBar({onNavigate, activePage}: SideBarProps){
    return(
        <aside>
			<div className="p-3">
				<h3 className="text-2xl font-semibold mb-6 ml-3">Menu</h3>
				<nav className="">
					<ul className="space-y-4">
						<li>
							<button
								onClick={() => onNavigate("InputProductPage")}
								className={`flex items-center text-black py-2 px-4 w-full text-left hover:bg-[#0070F2] hover:rounded hover:text-white ${
								activePage === "InputProductPage" ? "bg-[#0070F2] rounded text-white" : ""
								}`}
							>
								<FaPlus className="mr-3"/>
								Input Product
							</button>
						</li>
						<li>
							<button
								onClick={() => onNavigate("ProductPage")}
								className={`flex items-center text-black py-2 px-4 w-full text-left hover:bg-[#0070F2] hover:rounded hover:text-white ${
								activePage === "ProductPage" ? "bg-[#0070F2] rounded text-white" : ""
								}`}
							>
								<FaList className="mr-3"/>
								List Product
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
    );
}