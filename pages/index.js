import Head from 'next/head'
import AddTask from './comps/AddTask'


export default function Home() {
  return (
    <>
    <div>
        <Head>
         <title>ToDo List App</title>
        </Head>
    </div>
    <main>
    <AddTask />
    </main>
    </>
  )
}
