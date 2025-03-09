import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <div className="relative min-h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute inset-0 -z-10 h-full w-full">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                </div>
                <Navbar />
                <div className="pb-16 min-h-screen"> {/* Add padding to the bottom and ensure min height */}
                    <Manager />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default App