<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Equivalent to 'next/navigation' useRouter
import ConfigProperties from "../utils/config-properties.ts"

const username = ref('');
const password = ref('');
const error = ref('');

// 2. Router Instance (Equivalent to useRouter)
const router = useRouter();

// 3. Form Submission Handler (Equivalent to handleSubmit)
const handleSubmit = async () => {
    // The .prevent modifier on the @submit event handles e.preventDefault()
    error.value = '';

    try {
        // --- Authentication Logic ---
        const response = await fetch(ConfigProperties.BASE_API_URL+'/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Access state values using .value
            body: JSON.stringify({ username: username.value, password: password.value }),
        });
        // ----------------------------

        if (!response.ok) {
            // Try to read the error message from the response body
            const data = await response.json();
            throw new Error(data.message || 'Login failed');
        }

        // Redirect on successful login (Equivalent to router.push('/'))
        await router.push('/');
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message;
        } else {
            error.value = 'An unknown error occurred.';
        }
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-white p-4">
        
        <div class="w-full max-w-md bg-gray-50 p-8 rounded-xl shadow-2xl border border-gray-100">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Sign In
            </h1>

            <div v-if="error" 
                 class="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">
                {{ error }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                
                <div>
                    <label 
                        for="username" 
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        v-model="username"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>
                
                <div>
                    <label 
                        for="password" 
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>
                
                <button 
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>