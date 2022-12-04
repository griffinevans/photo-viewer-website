import { Navbar } from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
export const Forbidden = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <h1>401 forbidden</h1>
      </main>
      <Footer />
    </div>
  )
}
