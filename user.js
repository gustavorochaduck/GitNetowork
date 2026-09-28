import { CreateTopBar } from "./components/Topbar.js";


const params = new URLSearchParams(window.location.search);
const username = params.get('user');
let response;
CreateTopBar();

if (!username) {
    document.getElementById('titulo').innerHTML = `
    <div class="    flex self-center items-center w-fit justify-center
    fixed
    inset-0
    px-4 py-3
    m-auto
    items-center
    bg-black/15
    backdrop-blur-xl
    border border-white/20
    rounded-xl shadow-lg">
        <span class="p-3">Invalid Input.</span>
    </div>
    `;

} else {
    
    document.getElementById('titulo').innerHTML = `
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" class="w-8 h-8 w-8 h-8 text-white animate-spin fill-brand" viewBox="0 0 100 101" fill="#1e232c" text="white" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
    `
    let user = await GET_user(username);
    document.querySelector('title').textContent = `${user.login}`
    document.getElementById('titulo').remove()
    const UserPanel = document.querySelector('.UserPanel');
    const div = document.createElement('div');
    const PanelStyle = `
    flex self-center items-center w-fit justify-evenly
    p-6
    gap-x-10
    bg-black/15
    backdrop-blur-xl
    border border-white/20 
    rounded-xl shadow-lg
    `;
    div.className = PanelStyle;
    div.innerHTML = `
    <div class="bg-[image:url('${user.avatar_url}')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
     <div class="gap-y-5 text-[#1e232c]">
         <p>Login: ${user.login}</p>
         <p>Username: ${user.name}</p>
         <p>Email: ${user.email}
         <p>Location: ${user.location}</p>
         <div class="flex gap-x-5 font-semibold">
             <p>followers: <span><a href="${user.followers_url}" id="followers">${user.followers} </a></span></p>
             <p>following: <span><a href="${user.following_url}" id="following">${user.following} </a></span></p>
         </div>  
    </div>
    `
    UserPanel.append(div);
    const followers_link = document.getElementById('followers');
    followers_link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `./followers.html?userlogin=${user.login}`;
    });
    const following_link = document.getElementById('following');
    following_link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `./following.html?userlogin=${user.login}`;
    });
}





async function GET_user(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);



    if (res.status === 404) {
        document.getElementById('titulo').remove();
        const UserPanel = document.querySelector('.UserPanel');
        if (UserPanel) {
            const div = document.createElement('div');
            const PanelStyle = `
                flex self-center items-center w-fit justify-evenly
                p-6
                gap-x-10
                bg-black/15
                backdrop-blur-xl
                border border-white/20
                rounded-xl shadow-lg
            `;

            div.className = PanelStyle;
            div.innerHTML = `
                <div class="bg-[image:url('./assets/img/run.gif')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
                <h1 class="text-[#1e232c] font-bold text-xl">Request rate: 100%</h1>
            `;

            UserPanel.appendChild(div);
        }

        return null;
    }

    else if (res.status === 403) {
        document.getElementById('titulo').remove();
        const UserPanel = document.querySelector('.UserPanel');
        if (UserPanel) {
            const div = document.createElement('div');
            const PanelStyle = `
                flex self-center items-center w-fit justify-evenly
                p-6
                gap-x-10
                bg-black/15
                backdrop-blur-xl
                border border-white/20
                rounded-xl shadow-lg
            `;

            div.className = PanelStyle;
            div.innerHTML = `
                <div class="bg-[image:url('./assets/img/run.gif')] bg-cover bg-center h-64 w-64 rounded-xl"></div>
                <h1 class="text-[#1e232c] font-bold text-xl">Request rate: 100%</h1>
            `;

            UserPanel.appendChild(div);
        }

        return null;
    }

    const dados = await res.json();
    return dados;
}