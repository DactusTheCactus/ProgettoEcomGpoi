<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Cart from './lib/Cart.svelte';
  import Auth from './lib/Auth.svelte';
  import { userStore } from './lib/stores';
  import { cartOpen } from './lib/stores';
  import logoImage from './assets/logo.jpeg';
  
  const routes = {
   '/':Home
  };

  function toggleCart() {
    cartOpen.update(value => !value);
  }

  let showAuth = false;
</script>


<nav>
  <div class="container">
    <div class="logo-container">
      <img 
        src={logoImage}
        alt="Logo" 
        class="logo-image" 
        class:spin={$userStore}
      />
    <div class="logo">Anzanation</div>
    <div class="nav-controls" style="text-align: right;">
      {#if $userStore}
        <div class="user-email">Welcome, {$userStore.email.charAt(0).toUpperCase().concat($userStore.email.split('@')[0].slice(1,$userStore.email.length))}</div>
      {/if}
      {#if $userStore}
        <button class="button-button" on:click={toggleCart}>Cart</button>
        <button class="button-button" on:click={() => showAuth = true}>Logout</button>
      {:else}
        <button class = "button-button" on:click={() => showAuth = true}>Login</button>
      {/if}
    </div>
  </div>
</nav>

<Auth 
    show={showAuth} 
    on:close={() => showAuth = false}
/>

<main>
  <Router {routes} />
</main>

<Cart />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  :global(body) {  
    margin: 0;
    font-family: 'Playfair Display', serif;
    background-color:rgb(17, 17, 17);
    color: #e3eaf0;
  }

  nav {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
    color: hsl(61, 87%, 45%);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0; 
    z-index: 100;
    /* box-shadow: 0 2px 10px rgba(0,0,0,0.1); */
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.8em;
    font-weight: 600;
    
  }

  .button-button {
    padding: 0.5rem 1rem;
    background: hsl(61, 87%, 45%);
    color: #2c3e50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Helvetica, serif;
    font-weight: bold;
  }

  .button-button:hover {
    background: hsl(61, 87%, 47%);
  }
  main {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
  }
    .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .spin {
    animation: spin 1s ease-in-out;
  }

  .nav-controls {
    display: flex;
    gap: 1rem;
    margin-left: auto; 
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>