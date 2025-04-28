<script lang="ts">
    import { user, login, logout } from './auth';
    let email = '';
    let password = '';
    let error = '';
  
    async function handleLogin() {
      try {
        await login(email, password);
        error = '';
      } catch (e) {
        error = 'Login failed';
      }
    }
  </script>
  
  {#if $user}
    <div>
      <p>Welcome, {$user.email}!</p>
      <button on:click={logout}>Logout</button>
    </div>
  {:else}
    <form on:submit|preventDefault={handleLogin}>
      <input type="email" bind:value={email} placeholder="Email" required />
      <input type="password" bind:value={password} placeholder="Password" required />
      <button type="submit">Login</button>
      {#if error}<p>{error}</p>{/if}
    </form>
  {/if}