export const Header = (props: any) => {
    return (
        <header style={{ display: 'flex', padding: 10 }}>
            <img src={require("./tweetch-logo.png")} alt="logo" height={75} style={{ marginRight: 25}}/>
            <h1>Tweetch</h1>
        </header>
    )
}