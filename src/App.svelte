<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Cart from './lib/Cart.svelte';

  const routes = {
    '/': Home,
  };
</script>

<nav>
  <div class="logo">Anzanatio Guns</div>
</nav>

<Router {routes} />
<Cart />

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
    color: #2c3e50;
  }

  nav {
    background: #ffffff;
    color: #2c3e50;
    padding: 1.5rem 2rem;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .logo {
    font-size: 1.8em;
    font-weight: 600;
    color: #166534;
  }
</style>