export default function getMappedEnum<T extends object>(
    enumToMap: T
): Array<keyof typeof enumToMap> {
    return Object.keys(enumToMap) as Array<keyof typeof enumToMap>
}