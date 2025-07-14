const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-[#F4A300]"></div>
                <span className="text-[#F4A300]">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;