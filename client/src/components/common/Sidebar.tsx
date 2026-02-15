export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-navy flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Editorial <span className="text-primary">CMS</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1"></nav>
    </aside>
  );
}
