interface LoginPageProps {
  onLogin: (payload: { email: string; password: string }) => Promise<void>;
  error?: string | null;
  demoMode?: boolean;
}

export const LoginPage = ({ onLogin, error, demoMode }: LoginPageProps) => {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-copy">
          <p className="eyebrow">منصة إدارة المكتب</p>
          <h1>تسجيل الدخول</h1>
          <p>
            بداية عملية للنظام تشمل الاستقبال، القضايا، الجلسات، المدد،
            المستندات، والمالية.
          </p>
          {demoMode ? (
            <p className="demo-note">
              هذه نسخة عرض تجريبية تعمل ببيانات داخلية لمراجعة العميل قبل الربط
              النهائي.
            </p>
          ) : null}
        </div>

        <form
          className="login-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            await onLogin({
              email: String(form.get("email") ?? ""),
              password: String(form.get("password") ?? "")
            });
          }}
        >
          <label>
            البريد الإلكتروني
            <input
              defaultValue={demoMode ? "demo@lawoffice.sa" : "admin@lawoffice.sa"}
              name="email"
              type="email"
              placeholder="name@example.com"
            />
          </label>

          <label>
            كلمة المرور
            <input
              defaultValue="123456"
              name="password"
              type="password"
              placeholder="********"
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit">دخول إلى لوحة التحكم</button>
        </form>
      </section>
    </main>
  );
};
