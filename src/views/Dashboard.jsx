function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-2">Welcome</h3>
            <p className="text-white/60">Get started by uploading your profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

