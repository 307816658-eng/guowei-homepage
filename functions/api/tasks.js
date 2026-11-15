// Cloudflare Pages Function: GET /api/tasks
export async function onRequestGet(context) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    let cloudTasks = [];
    if (context.env.TASK_KV) {
      const stored = await context.env.TASK_KV.get("tasks");
      if (stored) {
        cloudTasks = JSON.parse(stored);
      }
    }

    return new Response(JSON.stringify({ success: true, tasks: cloudTasks }), {
      headers,
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers,
      status: 500,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    status: 204,
  });
}
