import jsonwebtoken from "jsonwebtoken";

// Return verified token if successful or nothing
function verify(token: string): jsonwebtoken.JwtPayload | string | null {
  try {
    const v = jsonwebtoken.verify(token, process.env.JT_SECRET!);
    return v;
  } catch (error: any) {
    console.error(error?.message ?? error);
    return null;
  }
}

// Signs new token using provided data
function sign(payload: Object, options: jsonwebtoken.SignOptions): string {
  return jsonwebtoken.sign(payload, process.env.JT_SECRET!, options);
}

export default { sign, verify };
