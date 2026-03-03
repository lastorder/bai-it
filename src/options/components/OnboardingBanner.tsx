import type { OnboardingState } from "../hooks/useOnboardingState.ts";

interface OnboardingBannerProps {
  state: OnboardingState;
  onGoToSettings: () => void;
}

export function OnboardingBanner({ state, onGoToSettings }: OnboardingBannerProps) {
  if (state === "has-data") return null;

  return (
    <div className="onboarding-banner">
      <div className="banner-text">
        {state === "no-key"
          ? "以下是示例数据。配置 API Key 后，你浏览英文网页时就会自动积累真实的学习数据。"
          : "以下是示例数据。去浏览几篇英文网页，掰it 会自动帮你拆句、记词，你的学习数据就会出现在这里。"}
      </div>
      {state === "no-key" && (
        <button className="banner-link" onClick={onGoToSettings} type="button">
          去设置 →
        </button>
      )}
    </div>
  );
}
