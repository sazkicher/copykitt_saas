"use client";
import Image from "next/image";
import logo from "../public//copykittLogo.svg"
import React from "react";
import Form from "./form";
import Results from "./results";
import { useEffect } from "react";

const CopyKitt: React.FC = () => {
	const CHARACTER_LIMIT: number = 50;
	// const ENDPOINT: string = process.env._API_ENDPOINT || "";
	const [prompt, setPrompt] = React.useState("");
	const [snippet, setSnippet] = React.useState("");
	const [keyword, setKeyword] = React.useState([]);
	const [hasResult, setHasResult] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const [theme, setTheme] = React.useState<string>("auto"); // Default to "auto"

	/* Start theme dark/light option */
	// Initialize theme based on localStorage or system preferences
	useEffect(() => {
		if (typeof window === "undefined") return;
	
		const html = document.querySelector("html");
		if (!html) return;
	
		// Check system preferences
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	
		// Apply theme based on the system preferences
		const systemTheme = prefersDark ? "dark" : "light";
		html.classList.remove("dark", "light");
		html.classList.add(systemTheme);
		setTheme("auto");
	
		// Save in localStorage as "auto" if there's not a previous value
		const storedTheme = localStorage.getItem("hs_theme");
		if (!storedTheme) {
		  localStorage.setItem("hs_theme", "auto");
		}
	  }, []);
	
	  const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	  };

	  useEffect(() => {
		if (typeof window === "undefined") return;
	
		const handleOutsideClick = (event: MouseEvent) => {
		  if (
			!event.target ||
			!(event.target as HTMLElement).closest("#selectThemeDropdown") &&
			!(event.target as HTMLElement).closest("#hs-dropdown-dark-mode")
		  ) {
			setIsDropdownOpen(false);
		  }
		};
	  
		document.addEventListener("click", handleOutsideClick);
		return () => {
		  document.removeEventListener("click", handleOutsideClick);
		};
	  }, []);
	
	  const handleThemeChange = (newTheme: string) => {
		if (typeof window === "undefined") return;
	
		const html = document.querySelector("html");
		if (!html) return;
	
		if (newTheme === "auto") {
		  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		  const systemTheme = prefersDark ? "dark" : "light";
		  html.classList.remove("dark", "light");
		  html.classList.add(systemTheme);
		  setTheme("auto");
		} else {
		  html.classList.remove("dark", "light");
		  html.classList.add(newTheme);
		  setTheme(newTheme);
		}
	
		localStorage.setItem("hs_theme", newTheme);
		setIsDropdownOpen(false);
	  };
	
	  const getThemeIcon = () => {
		if (typeof window === "undefined") return null;
	
		if (theme === "dark") {
		  return (
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="24"
			  height="24"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  strokeWidth="2"
			  strokeLinecap="round"
			  strokeLinejoin="round"
			>
			  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
			</svg>
		  );
		}
	
		if (theme === "light") {
		  return (
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="24"
			  height="24"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  strokeWidth="2"
			  strokeLinecap="round"
			  strokeLinejoin="round"
			>
			  <circle cx="12" cy="12" r="4"></circle>
			  <path d="M12 2v2"></path>
			  <path d="M12 20v2"></path>
			  <path d="m4.93 4.93 1.41 1.41"></path>
			  <path d="m17.66 17.66 1.41 1.41"></path>
			  <path d="M2 12h2"></path>
			  <path d="M20 12h2"></path>
			  <path d="m6.34 17.66-1.41 1.41"></path>
			  <path d="m19.07 4.93-1.41 1.41"></path>
			</svg>
		  );
		}
	
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		return prefersDark ? (
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		  >
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		  </svg>
		) : (
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		  >
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		  </svg>
		);
	  };
	  /* End theme dark/light option */

	const onSubmit = async () => {
		console.log("Submitting: " + prompt);
		setIsLoading(true);
		try {
			const response = await fetch(`/api/proxy?prompt=${encodeURIComponent(prompt)}`, {
				method: 'GET',
			});

			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();
			onResult(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
		// fetch(`${ENDPOINT}?prompt=${prompt}`).then((res) => res.json()).then(onResult).catch(error => {
		//    console.error('Error fetching data:', error);
		//  });;
	};

	// console.log(ENDPOINT);

	const onResult = (data: any) => {
		setSnippet(data.snippet);
		setKeyword(data.keyword);
		setHasResult(true);
		setIsLoading(false);
	};
	const onReset = () => {
		setPrompt("")
		setHasResult(false);
		setIsLoading(false);
	};

	let displayedElement = null;

	console.log(snippet)
	console.log(keyword)

	if (hasResult) {
		displayedElement = <Results snippet={snippet} keyword={keyword} onBack={onReset} prompt={prompt} />
	} else {
		displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />;
	}
	const gradientTextStyle =
		"text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 dark:from-red-500 dark:to-yellow-600 font-light w-fit mx-auto";
	return (


		<div className="h-screen flex">

    <div className="relative mt-4">
      {/* Dropdown button */}
      <button
        id="hs-dropdown-dark-mode"
        type="button"
        className="flex items-center text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-500"
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
        aria-label="Dropdown"
        onClick={toggleDropdown}
      >
        {getThemeIcon()}
      </button>

      {/* Dropdown menu */}
      <div
        id="selectThemeDropdown"
        className={`absolute left-0 mt-2 z-10 transition-all duration-300 bg-white shadow-md rounded-lg p-1 space-y-0.5 dark:bg-neutral-800 dark:border dark:border-neutral-700 ${
          isDropdownOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-dropdown-dark-mode"
      >
        <button
          type="button"
          onClick={() => handleThemeChange("light")}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => handleThemeChange("dark")}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => handleThemeChange("auto")}
          className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          System
        </button>
      </div>
    </div>
			<div className="max-w-md m-auto p-2">
				<div className=" bg-gray-200 dark:bg-slate-800 p-6 rounded-md ">
					<div className="text-center my-6">
						<Image
							className="dark:invert mx-auto " /*invert image*/
							src={logo}
							alt="copykitt_logo"
							width={64}
							height={64}
							priority
						/>
						<h1 className={gradientTextStyle + " text-3xl"}>Branding Ideas AI</h1>
						<div className={gradientTextStyle}> Your AI branding asistant</div>
					</div>
					{displayedElement}
				</div>

				<div className="flex justify-center gap-2 flex-wrap">
					project by
					<a
						className="flex items-center gap-1 hover:underline hover:underline-offset-4"
						href="https://github.com/sazkicher"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							aria-hidden
							src="/github.svg"
							alt="github_logo"
							width={16}
							height={16}
						/>
						sazkicher
					</a>
				</div>
			</div>




		</div>
	);
}
export default CopyKitt;
