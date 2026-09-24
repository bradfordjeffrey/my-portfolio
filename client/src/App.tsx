import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import { creative, focusAreas } from './data/portfolio'
import CreativePage from './pages/CreativePage'
import FocusAreaPage from './pages/FocusAreaPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* One page per focus area, e.g. /web-development. The key makes React
            build a fresh page when switching areas, so the entrance animations replay. */}
        {focusAreas.map((area) => (
          <Route key={area.slug} path={area.slug} element={<FocusAreaPage key={area.slug} area={area} />} />
        ))}
        <Route path={creative.slug} element={<CreativePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
