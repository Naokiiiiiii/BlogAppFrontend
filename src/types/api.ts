/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/user": {
    /** 自身のユーザー情報を返す */
    get: {
      responses: {
        /** @description Successful Response */
        200: {
          content: {
            "application/json": components["schemas"]["getUserResponse"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/user/{user_id}": {
    /** 指定したidのユーザー情報を変更する */
    put: {
      parameters: {
        path: {
          user_id: number;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["putUserRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: never;
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/token": {
    /** IDトークン、アクセストークン、リフレッシュトークンを取得する */
    get: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["getCallbackTokenRequest"];
        };
      };
      responses: {
        /** @description Successful Response */
        200: {
          content: {
            "application/json": components["schemas"]["token"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/regenearte_token": {
    /** IDトークン、アクセストークンを再取得 */
    get: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["getRegenerateTokenRequest"];
        };
      };
      responses: {
        /** @description Successful Response */
        200: {
          content: {
            "application/json": components["schemas"]["token"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/article": {
    /** 記事を投稿する */
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["postArticleRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: {
            "application/json": components["schemas"]["article"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/article/list": {
    /** 記事一覧を取得する */
    get: {
      parameters: {
        query?: {
          page?: string;
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: {
            "application/json": components["schemas"]["getArticleListResponse"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/article/{article_id}": {
    /** 指定したidの記事詳細を取得 */
    get: {
      parameters: {
        path: {
          article_id: number;
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: {
            "application/json": components["schemas"]["article"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
    /** 指定したidの記事を変更する */
    put: {
      parameters: {
        path: {
          article_id: number;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["putArticleRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: never;
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
    /** 指定したidの記事を削除する */
    delete: {
      parameters: {
        path: {
          article_id: number;
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: never;
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/comment": {
    /** 指定した記事にコメントを登録する */
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["postCommentRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: {
            "application/json": components["schemas"]["comment"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/comment/{comment_id}": {
    /** 指定したidの記事を変更する */
    put: {
      parameters: {
        path: {
          comment_id: number;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["putCommentRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: never;
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
    /** 指定したidのコメントを削除する */
    delete: {
      parameters: {
        path: {
          comment_id: number;
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: never;
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
  "/nice": {
    /** 指定した記事にいいねを登録する */
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["postNiceRequest"];
        };
      };
      responses: {
        /** @description SuccessResponse */
        200: {
          content: {
            "application/json": components["schemas"]["nice"];
          };
        };
        /** @description Error */
        400: {
          content: {
            "application/json": components["schemas"]["error"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    user: {
      user_id: number;
      google_id?: number;
      user_name: string;
      email: string;
      created_at: string;
      updated_at: string;
    };
    article: {
      id: number;
      title: string;
      contents: string;
      user_id: number;
      user_name: string;
      nice_num?: number;
      created_at: string;
      updated_at: string;
      comment_list?: components["schemas"]["comment"][];
    };
    comment: {
      comment_id?: number;
      article_id?: number;
      user_id?: number;
      message?: string;
    };
    nice: {
      nice_id?: number;
      article_id?: number;
      user_id?: number;
    };
    token: {
      id_token?: string;
      access_token?: string;
      refresh_token?: string;
    };
    getUserResponse: {
      user_id: number;
      google_id?: number;
      user_name: string;
      email: string;
      created_at: string;
      updated_at: string;
    };
    putUserRequest: {
      user_name?: string;
    };
    getCallbackTokenRequest: {
      code: string;
    };
    getRegenerateTokenRequest: {
      refresh_token: string;
    };
    postArticleRequest: {
      title: string;
      contents: string;
      user_id: number;
    };
    getArticleListResponse: components["schemas"]["article"][];
    putArticleRequest: {
      title?: string;
      contents?: string;
    };
    postCommentRequest: {
      article_id?: number;
      user_id?: number;
      message?: string;
    };
    putCommentRequest: {
      message?: string;
    };
    postNiceRequest: {
      article_id?: number;
      user_id?: number;
    };
    postGoogleCallbackRequest: {
      code?: string;
    };
    error: {
      ErrCode?: string;
      Message?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
