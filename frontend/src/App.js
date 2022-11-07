import TodosList from './components/TodosList.jsx';

function App() {
  return (
    <div className="flex w-full px-8 flex-col h-screen place-content-center items-center bg-slate-400 dark:bg-black dark:text-white">
      <div className=' w-full py-4 rounded-xl place-content-center items-center bg-slate-300 dark:bg-slate-900'>
        <h1 className='text-3xl text-center'>Todoro</h1>
      </div>
      <TodosList />
    </div>
  );
}

export default App;