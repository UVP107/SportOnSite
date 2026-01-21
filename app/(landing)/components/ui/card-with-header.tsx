type TCardWithHeader = {
    title: string;
    children: React.ReactNode;
}

const CardWithHeader = ({title, children}:TCardWithHeader) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
                <h2 className="font-bold text-lg">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default CardWithHeader;
