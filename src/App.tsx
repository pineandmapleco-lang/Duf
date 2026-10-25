import { DashboardProvider } from './context/DashboardContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ActionItemsSection } from './components/sections/ActionItems'
import { RevenueSection } from './components/sections/Revenue'
import { ProjectsSection } from './components/sections/Projects'
import { ReleaseCalendarSection } from './components/sections/ReleaseCalendar'
import { AgentActivitySection } from './components/sections/AgentActivity'
import { FilesCommsSection } from './components/sections/FilesComms'

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen text-mp-text">
        <a
          href="#action-items"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-mp-accent focus:px-4 focus:py-2 focus:text-mp-bg"
        >
          Skip to today's action items
        </a>
        <Header />
        <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <ActionItemsSection />
          <RevenueSection />
          <ProjectsSection />
          <ReleaseCalendarSection />
          <AgentActivitySection />
          <FilesCommsSection />
        </main>
        <Footer />
      </div>
    </DashboardProvider>
  )
}

export default App
