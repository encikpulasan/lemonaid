import { define } from "../utils.ts";

export default define.page(() => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div class="px-4 py-16 mx-auto max-w-4xl">
        {/* Hero Section */}
        <div class="text-center mb-16">
          <div class="inline-block mb-6">
            <span class="text-6xl">🍋</span>
          </div>
          <h1 class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Fresh Lemonaid
          </h1>
          <p class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Squeeze the most out of Fresh v2
          </p>
          <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A zesty, production-ready boilerplate optimized for vibe coding and AI-assisted development. 
            Start building with all the essentials pre-squeezed.
          </p>
        </div>

        {/* Features Grid */}
        <div class="grid md:grid-cols-3 gap-6 mb-16">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🤖</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">AI-Optimized</h3>
            <p class="text-gray-600">
              Perfect for vibe coding with Cursor IDE. Comprehensive examples, types, and utilities that help AI generate better code.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">🚀</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Production-Ready</h3>
            <p class="text-gray-600">
              Security, logging, validation, and error handling built-in. Deploy to Deno Deploy with confidence.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">⚡</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Zero Config</h3>
            <p class="text-gray-600">
              Fresh v2, TypeScript, Tailwind CSS v4, and all utilities pre-configured. Start coding immediately.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div class="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 shadow-xl">
          <h2 class="text-3xl font-bold text-white mb-4">Get Started in Seconds</h2>
          <div class="bg-white/95 rounded-lg p-4 mb-4 font-mono text-sm">
            <div class="text-gray-600 mb-2"># Use as template on GitHub</div>
            <div class="text-gray-800">Click "Use this template" → Create repository</div>
            <div class="text-gray-600 mt-4 mb-2"># Or clone directly</div>
            <div class="text-gray-800">git clone &lt;repo-url&gt; my-project</div>
            <div class="text-gray-600 mt-4 mb-2"># Start developing</div>
            <div class="text-gray-800">deno task dev</div>
          </div>
          <p class="text-white/90 text-sm">
            🎯 Perfect for vibe coding • 🛡️ Security built-in • 📚 Well-documented
          </p>
        </div>

        {/* Footer Note */}
        <div class="mt-12 text-center text-gray-500">
          <p>Made with ❤️ for developers who want to build fast, not configure</p>
        </div>
      </div>
    </div>
  );
});
