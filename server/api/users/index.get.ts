import { useDrizzle, tables } from '../../utils/drizzle';

export default eventHandler( async () => {
	return useDrizzle().select().from( tables.users ).all();
} );
