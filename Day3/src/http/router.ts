export interface Route {
  method: string;
  path: string;
}

export function matchRoute(
  method: string,
  url: string,
): { route: Route; id?: string } | null {
  const pathname = url.split("?")[0];

  if (method === "GET" && pathname === "/tasks") {
    return {
      route: {
        method: "GET",
        path: "/tasks",
      },
    };
  }

  const taskMatch = pathname.match(/^\/tasks\/([^/]+)$/);

  if (taskMatch) {
    const id = taskMatch[1];

    if (method === "GET") {
      return {
        route: {
          method: "GET",
          path: "/tasks/:id",
        },
        id,
      };
    }

    if (method === "PATCH") {
      return {
        route: {
          method: "PATCH",
          path: "/tasks/:id",
        },
        id,
      };
    }

    if (method === "DELETE") {
      return {
        route: {
          method: "DELETE",
          path: "/tasks/:id",
        },
        id,
      };
    }
  }

  if (method === "POST" && pathname === "/tasks") {
    return {
      route: {
        method: "POST",
        path: "/tasks",
      },
    };
  }

  return null;
}
