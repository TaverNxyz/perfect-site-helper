const DiscordWidget = () => {
  return (
    <div className="w-[300px] h-[200px]">
      <iframe 
        src="https://discord.com/widget?id=1325470956658888774&theme=dark" 
        width="300" 
        height="200"
        allowTransparency={true} 
        frameBorder="0" 
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="rounded-lg shadow-lg border border-red-600/30"
      />
    </div>
  );
};

export default DiscordWidget;