import './BusinessHours.css';

export default function BusinessHours() {
    return (
        <>
            <div class="biz-guide">
                <span class="biz-label">Business hours (local)</span>
                <div class="biz-legends">
                    <span class="biz-pill biz-core">
                        <span class="biz-dot biz-dot-core"></span>
                        Core 09:00–18:00
                    </span>
                    <span class="biz-pill biz-off">
                        <span class="biz-dot biz-dot-off"></span>
                        Off 18:00–09:00
                    </span>
                </div>
            </div>
        </>
    )
}